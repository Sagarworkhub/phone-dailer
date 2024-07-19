import { Outlet } from 'react-router-dom';

export function Layout() {
    return (
        <div className='mx-auto flex min-h-[812px] w-[375px] flex-col border'>
            <div>
                <img
                    alt='status bar'
                    src={'/icons/statusBar.svg'}
                    className='h-[44px] w-full'
                />
            </div>
            <main className='flex flex-1 flex-col'>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
