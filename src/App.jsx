import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import CompanyList from "./components/CompanyList/CompanyList";
import DealsList from "./components/DealsList/DealsList";
import AddEditCompany from "./components/AddEditCompany/AddEditCompany";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <div className="app__content">
          <Routes>
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/deals" element={<DealsList />} />
            <Route path="/add-company" element={<AddEditCompany />} />
            <Route
              path="/edit-company/:companyId"
              element={<AddEditCompany />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
