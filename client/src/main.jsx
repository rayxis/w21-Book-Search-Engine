import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components
import App from './App.jsx';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';

// Create the Apollo Client and specify the endpoint for fetching GraphQL data
const client = new ApolloClient({
	                                url:   'http://localhost:8000/graphql',
	                                cache: new InMemoryCache()
                                });

// Define the routes for the application
const router = createBrowserRouter([
	                                   {
		                                   path:         '/',
		                                   element:      <App/>,
		                                   errorElement: <h1 className="display-2">Wrong page!</h1>,
		                                   children:     [
			                                   {
				                                   index:   true,
				                                   element: <SearchBooks/>
			                                   },
			                                   {
				                                   path:    '/saved',
				                                   element: <SavedBooks/>
			                                   }
		                                   ]
	                                   }
                                   ]);

// Render the application, providing it with the Apollo and Router contexts
ReactDOM.createRoot(document.getElementById('root')).render(
	<ApolloProvider client={client}>
		<RouterProvider router={router}/>
	</ApolloProvider>
);
