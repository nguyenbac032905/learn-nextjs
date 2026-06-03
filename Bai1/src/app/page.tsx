import Counter from "@/components/Counter/Counter";
import "./global.css";
import UserTable from "@/components/UserTable/UserTable";

interface User {
    id: number;
    name: string;
    email: string;
}

const HomePage = async () => {
    const res = await fetch("http://localhost:8000/users");
    const data: User[] = await res.json();
    return (
        <>
            <div className="container">
                <Counter />
                <div className="user-table">
                    <h1>User Table</h1>
                    <UserTable users={data}/>
                </div>
            </div>
        </>
    );
}
export default HomePage;
