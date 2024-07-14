import { Outlet } from 'react-router-dom';

export function Layout() {
    return (
        <div className='mx-auto w-[375px] border'>
            <div>
                <img
                    alt='status bar'
                    src={'/icons/statusBar.svg'}
                    className='h-[44px] w-full'
                />
            </div>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
