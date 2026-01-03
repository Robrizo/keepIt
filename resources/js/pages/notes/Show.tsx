import Navbar from '@/components/Navbar';
import { formatDateTime } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

type Note = {
    id: number;
    title: string;
    content: string;
    created_at: string;
};

export default function Show() {
    const { note } = usePage().props as unknown as { note: Note };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="mx-auto mt-10 max-w-3xl p-4">
                <div className="mb-4 flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div className="text-blue-600">
                        <Link
                            href={'/notes'}
                            className="flex cursor-pointer items-center gap-1"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Go Back
                        </Link>
                    </div>

                    <div className="text-sm text-gray-400">
                        Created on {formatDateTime(note.created_at)}
                    </div>
                </div>

                <div className="mb-4 flex justify-between">
                    <h1 className="text-3xl font-bold capitalize">
                        {note.title}
                    </h1>
                </div>

                <p className="whitespace-pre-wrap text-gray-700 first-letter:capitalize">
                    {note.content}
                </p>
            </div>
        </div>
    );
}
