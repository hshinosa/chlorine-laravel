import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

export default function Edit({ auth, category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
        is_publish: category.is_publish ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('categories.update', category.id));
    };

    const breadcrumbs = [
        { text: "Home", link: route('dashboard') },
        { text: "Kategori Layanan", link: route('categories.index') },
        { text: "Edit Kategori", link: null }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-semibold leading-tight text-gray-800">
                            Edit Kategori Layanan
                        </h2>
                        <nav className="flex mt-2" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                {breadcrumbs.map((crumb, index) => (
                                    <li key={index} className="inline-flex items-center">
                                        {index > 0 && (
                                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                        {crumb.link ? (
                                            <Link href={crumb.link} className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">
                                                {crumb.text}
                                            </Link>
                                        ) : (
                                            <span className="ml-1 text-gray-500 md:ml-2">{crumb.text}</span>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    </div>
                </div>
            }
        >
            <Head title="Edit Kategori Layanan" />

            <div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <InputLabel htmlFor="name" value="Nama Kategori" required />
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Masukkan nama kategori"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            {/* Status Publish Field */}
                            <div>
                                <InputLabel htmlFor="is_publish" value="Status Publish" required />
                                <div className="mt-2 space-y-3">
                                    <div className="flex items-center">
                                        <input
                                            id="publish_true"
                                            name="is_publish"
                                            type="radio"
                                            value="true"
                                            checked={data.is_publish === true}
                                            onChange={() => setData('is_publish', true)}
                                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                                        />
                                        <label htmlFor="publish_true" className="ml-3 block text-sm font-medium text-gray-700">
                                            Published
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="publish_false"
                                            name="is_publish"
                                            type="radio"
                                            value="false"
                                            checked={data.is_publish === false}
                                            onChange={() => setData('is_publish', false)}
                                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                                        />
                                        <label htmlFor="publish_false" className="ml-3 block text-sm font-medium text-gray-700">
                                            Draft
                                        </label>
                                    </div>
                                </div>
                                <InputError message={errors.is_publish} className="mt-2" />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                                <Link 
                                    href={route('categories.index')}
                                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-gray-700 text-sm hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                >
                                    Batal
                                </Link>
                                <PrimaryButton disabled={processing}>
                                    {processing ? 'Menyimpan...' : 'Perbarui Kategori'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}