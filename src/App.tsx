import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Layouts from './layout';
import routes from './routes';

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
          <Routes>
              {Layouts.map((layout, index) =>
                <Route
                  key={index}
                  path={`rickandmorty${layout.path}`}
                  element={layout.component}
                >
                  {routes.filter(x=> x.layout === layout.name).map((item, key) => 
                    <Route
                      key={key}
                      path={item.path}
                      element={item.component}
                    />
                  )}
                </Route>
              )}
          </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
