function LogOut({ history }) {
    fetch('/auth/admin-logout')
        .then(res => res.json())
        .then(res => {
            history.push('/admin/login')
        })
        .catch(err => console.log(err))
}

export default LogOut;