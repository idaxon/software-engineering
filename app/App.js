import SubmitPage from './components/SubmitPage'; // Import the new SubmitPage component

function App() {
    return (
        <Router>
            <Switch>
                {/* ... existing routes ... */}
                <Route path="/submit" component={SubmitPage} /> {/* New route for SubmitPage */}
                {/* ... existing routes ... */}
            </Switch>
        </Router>
    );
}

export default App; 