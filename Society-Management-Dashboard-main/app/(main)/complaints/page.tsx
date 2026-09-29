import { User, UserRole } from "@/utils/types";
import ComplaintsModule from "./_components/ComplaintsModule";


export default function Home() {
    const mockUser: User = {
        id: 'u1',
        name: 'Alexander Pierce',
        role: 'ADMIN' as UserRole, // Type assertion
    };

    return (

        <div className="">
            <ComplaintsModule user={mockUser} />
        </div>

    );
}