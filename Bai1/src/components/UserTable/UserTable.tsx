"use client"
import { useEffect, useState } from 'react';
import './userTable.css';
import Link from 'next/link';

interface User {
    id: number;
    name: string;
    email: string;
}
interface Props {
    users: User[];
}
const UserTable = (props: Props) => {
    const { users } = props;
    return (
        <>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map(user => (
                            <tr key={user.id}>
                                <td><Link href={`/user/${user.id}`}>{user.id}</Link></td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default UserTable;