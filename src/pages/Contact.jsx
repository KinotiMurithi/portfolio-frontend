import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function Contact() {
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const validateField = (name, value) => {
        switch (name) {
            case 'user_name':
                if (!value.trim()) return 'Name is required';
                if (value.length < 2) return 'Name must be at least 2 characters';
                return '';
            case 'user_email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value.trim()) return 'Email is required';
                if (!emailRegex.test(value)) return 'Invalid email format';
                return '';
            case 'message':
                if (!value.trim()) return 'Message is required';
                if (value.length < 10) return 'Message must be at least 10 characters';
                return '';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        const errorMsg = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    };

    const isFormValid = () => {
        return (
            !Object.values(errors).some(Boolean) &&
            formData.user_name.trim() &&
            formData.user_email.trim() &&
            formData.message.trim()
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {
            user_name: validateField('user_name', formData.user_name),
            user_email: validateField('user_email', formData.user_email),
            message: validateField('message', formData.message),
        };
        setErrors(newErrors);

        if (Object.values(newErrors).some(Boolean)) return;

        setLoading(true);
        setStatus('');

        const backendUrl = process.env.REACT_APP_API_URL;

        if (backendUrl) {
            // fallback to your Django API if needed
            fetch(`${backendUrl}/contact/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
                .then((res) => {
                    if (!res.ok) throw new Error('Network response was not ok');
                    return res.json();
                })
                .then(() => {
                    setLoading(false);
                    setShowPopup(true);
                    setStatus('Message sent via backend!');
                    setFormData({ user_name: '', user_email: '', message: '' });
                })
                .catch(() => {
                    setLoading(false);
                    setStatus('Backend failed. Trying EmailJS...');
                    sendViaEmailJS();
                });
        } else {
            sendViaEmailJS();
        }
    };

    const sendViaEmailJS = () => {
        emailjs
            .send(
                'service_1lfbzwu',
                'template_depmfzw',
                formData,
                'lh8SE9q2c8aW6VPOp'
            )
            .then(() => {
                setLoading(false);
                setShowPopup(true);
                setStatus('Message sent via EmailJS!');
                setFormData({ user_name: '', user_email: '', message: '' });
                setErrors({});
            })
            .catch(() => {
                setLoading(false);
                setStatus('Failed to send message. Try again later.');
            });
    };

    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => setShowPopup(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showPopup]);

    return (
        <section className="max-w-2xl mx-auto p-6 md:p-10">
            <Helmet>
                <title>Contact | Collins Kinoti Portfolio</title>
                <meta name="description" content="Get in touch with Collins Kinoti, a software developer and web designer based in Nairobi." />
                <meta property="og:title" content="Contact | Collins Kinoti Portfolio" />
                <meta property="og:description" content="Reach out via the contact form or email me directly." />
            </Helmet>

            <motion.h2
                className="text-3xl font-bold mb-6 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Contact Me
            </motion.h2>

            <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                noValidate
            >
                <div>
                    <label className="block font-medium mb-1">Your Name</label>
                    <input
                        type="text"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        className={`w-full border px-4 py-2 rounded dark:bg-gray-800 ${errors.user_name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.user_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.user_name}</p>
                    )}
                </div>

                <div>
                    <label className="block font-medium mb-1">Your Email</label>
                    <input
                        type="email"
                        name="user_email"
                        value={formData.user_email}
                        onChange={handleChange}
                        className={`w-full border px-4 py-2 rounded dark:bg-gray-800 ${errors.user_email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.user_email && (
                        <p className="text-red-500 text-sm mt-1">{errors.user_email}</p>
                    )}
                </div>

                <div>
                    <label className="block font-medium mb-1">Your Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className={`w-full border px-4 py-2 rounded dark:bg-gray-800 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={!isFormValid() || loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 w-full sm:w-auto"
                >
                    {loading ? 'Sending...' : 'Send'}
                </button>

                {status && !showPopup && (
                    <p className="mt-4 text-center text-blue-600 dark:text-blue-400">{status}</p>
                )}
            </motion.form>

            {showPopup && (
                <motion.div
                    className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                >
                    ✅ Message sent!
                </motion.div>
            )}
        </section>
    );
}
