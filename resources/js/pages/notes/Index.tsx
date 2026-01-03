import Navbar from '@/components/Navbar';
import { Link, router, usePage } from '@inertiajs/react';
import { Eye, SquarePen, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { formatDateTime } from '@/lib/utils';

type Note = {
    id: number;
    title: string;
    content: string;
    created_at: string;
    showLink: string;
    editNote: string;
    onDelete: () => void;
};

const deleteNote = (id: number) => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'This note will be permanently deleted!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, delete it',
        toast: true,
    }).then((result) => {
        if (result.isConfirmed) {
            router.delete(`/notes/${id}`, {
                onSuccess: () => {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your note has been deleted.',
                        icon: 'success',
                        toast: true,
                        position: 'top-right',
                        timer: 2500,
                        showConfirmButton: false,
                    });
                },
            });
        }
    });
};

const Index = () => {
    const { notes } = usePage().props as unknown as { notes: Note[] };

    const NotesCard = ({
        title,
        content,
        created_at,
        showLink,
        editNote,
        onDelete,
    }: Note) => {
        return (
            <div className="group relative rounded-lg border border-gray-300 bg-white p-4 shadow">
                <div>
                    <h2 className="text-lg text-gray-800 font-bold capitalize">{title}</h2>

                    <p className="truncate pr-24 text-gray-600">{content}</p>

                    <span className="mt-2 block text-sm text-gray-400">
                        {formatDateTime(created_at)}
                    </span>
                </div>

                <div className="absolute inset-y-0 right-5 hidden group-hover:block">
                    <div className="flex h-full items-center gap-4">
                        <Link href={showLink}>
                            <Eye className="h-4.5 w-4.5 cursor-pointer text-gray-600" />
                        </Link>
                        <Link href={editNote}>
                            <SquarePen className="h-4 w-4 cursor-pointer text-blue-600" />
                        </Link>
                        <button onClick={onDelete}>
                            <Trash2 className="h-4 w-4 cursor-pointer text-red-600" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main className="py-6">
                <div className="mx-auto mt-4 max-w-6xl p-4">
                    <div className="space-y-4">
                        <div className="flex w-fit flex-col justify-between space-y-4 md:w-full md:flex-row md:items-center md:space-y-0">
                            <h1 className="text-2xl font-bold">
                                Your recent notes
                            </h1>

                            <Link
                                href={'/notes/create'}
                                className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                            >
                                Create new note
                            </Link>
                        </div>

                        {!notes || notes.length === 0 ? (
                            <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center text-gray-500">
                                No recent notes to display.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                                {notes.map((note) => (
                                    <NotesCard
                                        key={note.id}
                                        title={note.title}
                                        content={note.content}
                                        created_at={note.created_at}
                                        showLink={`notes/${note.id}`}
                                        editNote={`notes/${note.id}/edit`}
                                        onDelete={() => deleteNote(note.id)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Index;
