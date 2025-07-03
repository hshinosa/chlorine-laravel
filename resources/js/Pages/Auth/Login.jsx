// filepath: d:\Code\chlorine-laravel\resources\js\Pages\Auth\Login.jsx
import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className="w-full max-w-md mx-auto">
                <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        Login to Chlorine
                    </h2>

                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Masukkan email Anda"
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Masukkan password Anda"
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ms-2 text-sm text-gray-600">Remember me</span>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <PrimaryButton 
                                className="w-full" 
                                disabled={processing}
                            >
                                {processing ? 'Logging in...' : 'Login'}
                            </PrimaryButton>
                        </div>

                        <div className="mt-4 text-center">
                            <Link
                                href={route('dashboard')}
                                className="text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                ← Back to Home
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}