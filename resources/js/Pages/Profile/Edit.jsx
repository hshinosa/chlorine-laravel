import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl sm:text-2xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="space-y-6 sm:space-y-8">
                {/* Profile Information Card */}
                <div className="bg-white rounded-lg card-shadow hover:card-shadow-hover transition-shadow">
                    <div className="p-4 sm:p-6">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>
                </div>

                {/* Password Card */}
                <div className="bg-white rounded-lg card-shadow hover:card-shadow-hover transition-shadow">
                    <div className="p-4 sm:p-6">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </div>

                {/* Delete Account Card */}
                <div className="bg-white rounded-lg card-shadow hover:card-shadow-hover transition-shadow mb-6">
                    <div className="p-4 sm:p-6">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
