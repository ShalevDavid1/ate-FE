interface MainProps {
    userInfo: UserInfo;
}

const Main = ({ userInfo }: MainProps) => {
    console.log(userInfo.email);

    return (
        <h1>hello {userInfo.email}</h1>
    );
};

export default Main;
