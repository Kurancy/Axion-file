import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertTriangle, Mail, MessageSquare, User, Tag } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const validate = (values: FormState): FormErrors => {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = 'Your name is required.';
  if (!values.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.subject.trim()) errors.subject = 'Subject is required.';
  if (!values.message.trim()) {
    errors.message = 'Message cannot be empty.';
  } else if (values.message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters.';
  }
  return errors;
};

const InputField: React.FC<{
  label: string;
  id: string;
  icon: React.ElementType;
  error?: string;
  children: React.ReactNode;
}> = ({ label, id, icon: Icon, error, children }) => (
  <div>
    <label htmlFor={id} className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
      <Icon className="w-3.5 h-3.5 text-emerald-400" />
      {label}
    </label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-xs text-rose-400 mt-1.5"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(validate({ ...form, [name]: value }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, subject: true, message: true };
    setTouched(allTouched);
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('loading');

    // Simulate a network delay; replace with real API call when ready
    await new Promise((r) => setTimeout(r, 1500));

    // For now we show success UI indicating the form was received
    // but note: no email backend is connected yet
    setStatus('success');
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 bg-slate-900 border transition-all focus:outline-none focus:ring-2 ${
      errors[field] && touched[field]
        ? 'border-rose-500/60 focus:ring-rose-500/30'
        : 'border-slate-700 focus:ring-emerald-500/40 focus:border-emerald-500/50'
    }`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6">
              <Mail className="w-3.5 h-3.5" />
              Contact Us
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-5">
              Let's Make an Impact{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Together.</span>
            </h1>
            <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
              Have a question, need support, or want to learn more about Axion Donate? Get in touch with us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-2xl bg-emerald-950/50 border border-emerald-800/60 p-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-9 h-9 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Thank you.</h2>
                <p className="text-slate-400 mb-2">Your message has been received.</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  We will review your message and respond as soon as possible.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }); setTouched({}); }}
                  className="mt-8 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 p-8 sm:p-10"
              >
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-rose-950/50 border border-rose-800/60 text-rose-400 text-sm mb-6"
                  >
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    Something went wrong. Please try again.
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField label="Your Name" id="name" icon={User} error={touched.name ? errors.name : undefined}>
                      <input
                        id="name" name="name" type="text"
                        value={form.name} onChange={handleChange} onBlur={handleBlur}
                        placeholder="e.g. Alex Morgan"
                        className={inputClass('name')}
                      />
                    </InputField>

                    <InputField label="Email Address" id="email" icon={Mail} error={touched.email ? errors.email : undefined}>
                      <input
                        id="email" name="email" type="email"
                        value={form.email} onChange={handleChange} onBlur={handleBlur}
                        placeholder="alex@example.com"
                        className={inputClass('email')}
                      />
                    </InputField>
                  </div>

                  <InputField label="Subject" id="subject" icon={Tag} error={touched.subject ? errors.subject : undefined}>
                    <input
                      id="subject" name="subject" type="text"
                      value={form.subject} onChange={handleChange} onBlur={handleBlur}
                      placeholder="How can we help?"
                      className={inputClass('subject')}
                    />
                  </InputField>

                  <InputField label="Message" id="message" icon={MessageSquare} error={touched.message ? errors.message : undefined}>
                    <textarea
                      id="message" name="message" rows={6}
                      value={form.message} onChange={handleChange} onBlur={handleBlur}
                      placeholder="Describe your question or concern in detail..."
                      className={`${inputClass('message')} resize-none`}
                    />
                  </InputField>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                  >
                    {status === 'loading' ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};
