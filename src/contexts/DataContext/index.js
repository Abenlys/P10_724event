import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const response = await fetch("/events.json");
    const dataFetch = await response.json();
    return dataFetch;
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getData = useCallback(async () => {
    try {
      const newData = await api.loadData();
      setData(newData);
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    getData();
  }, [data, getData]);

  const contextValue = useMemo(
    () => ({
      data,
      error,
    }),
    []
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
