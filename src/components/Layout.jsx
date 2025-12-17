import Header from './Header';
import Sidebar from './Sidebar';

function Layout({ children, openModal }) {
    return (
        <div className="layout">
            <Header openModal={openModal} />

            <div className="layout-body">
                <Sidebar />
                <main className="layout-content">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;
