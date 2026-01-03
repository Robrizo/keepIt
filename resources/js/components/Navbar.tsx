import { logout } from '@/routes';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

const Navbar = () => {
    const { auth } = usePage<SharedData>().props;
    return (
        <div className="sticky top-0 w-full">
            <header className="bg-blue-600 p-4">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <div className="text-xl font-bold">
                        <h2 className="text-white capitalize">
                            hie, <span>{auth.user.name}</span>
                        </h2>
                    </div>
                    <div>
                        <Link
                            href={logout()}
                            className="cursor-pointer rounded bg-white px-4 py-2 font-medium text-gray-800 hover:bg-gray-100"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Navbar;
