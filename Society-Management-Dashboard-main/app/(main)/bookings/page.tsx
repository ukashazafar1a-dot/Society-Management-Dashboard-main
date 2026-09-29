import BookingModule from "./_components/BookingModule";
import { UserRole } from "@/utils/types";

export default function Home() {
    const mockUser = {
        id: 'u1',
        name: 'Alexander Pierce',
        role: UserRole.ADMIN, // Use the enum value
        email: 'admin@example.com'
    };

    return (
        <main className="">
            <div className="">
                <BookingModule user={mockUser} />
            </div>
        </main>
    );
}