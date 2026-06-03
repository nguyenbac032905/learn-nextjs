const UserDetail = async ({params}: {params: Promise<{id: string}>}) => {
    const {id} = await params;
    return (
        <>
            <div>User detail : {id}</div>
        </>
    )
}
export default UserDetail;