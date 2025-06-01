import { AppRouter } from './routes/AppRouter';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  const isLoginPage = location.pathname === '/';

  return (
     <>
      <div className="flex min-h-screen">
        {!isLoginPage && <Sidebar />}

        <div className={`flex flex-col flex-grow w-full ${!isLoginPage ? "md:ml-64" : ""}`}>
          {!isLoginPage && <Navbar />}
          <div className="">
            <main className={`flex-grow ${!isLoginPage ? "p-4 mt-15" : ""}`}>
              <AppRouter />
            </main>
          </div>

          {!isLoginPage && <Footer />}
        </div>
      </div>
    </>
  )
}

export default App;
