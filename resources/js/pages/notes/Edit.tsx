import Navbar from '@/components/Navbar';
import { formatDateTime } from '@/lib/utils';
import { type SharedData } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import Swal from 'sweetalert2';

type Note = {
    id: number;
    title: string;
    content: string;
    updated_at: string;
};

const Edit = () => {
    const { auth, note } = usePage<SharedData & { note: Note }>().props;

    const { data, setData, put, processing, errors } = useForm({
        user_id: auth.user.id,
        title: note.title,
        content: note.content,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/notes/${note.id}`);

        Swal.fire({
            title: 'Update',
            text: 'Note updated successfully',
            icon: 'success',
            showConfirmButton: false,
            toast: true,
            position: 'top-right',
            timer: 2500,
        });
    };

    return (
        <div>
            <Navbar />

            <div className="mx-auto mt-10 max-w-3xl p-4">
                <div className="mb-4 flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div className="text-blue-600">
                        <Link
                            href="/notes"
                            className="flex cursor-pointer items-center gap-1"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Go Back
                        </Link>
                    </div>

                    <div className="text-sm text-gray-400">
                        Last updated on {formatDateTime(note.updated_at)}
                    </div>
                </div>

                <h1 className="mb-6 text-3xl font-bold">Edit Note</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="mb-2 block font-medium"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full border-b border-gray-300 p-2 outline-none focus:border-blue-600"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Content */}
                    <div>
                        <label
                            htmlFor="content"
                            className="mb-2 block font-medium"
                        >
                            Content
                        </label>
                        <textarea
                            id="content"
                            rows={6}
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="w-full resize-none border-b border-gray-300 p-2 outline-none focus:border-blue-600"
                        />
                        {errors.content && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.content}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="cursor-pointer rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing ? 'Updating...' : 'Update Note'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Edit;
