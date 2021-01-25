import React, { useEffect, useState } from 'react';
import './App.css';
import Editor from './Editor';
import Viewer from './Viewer';
import makePDF from './makePDF';
import { ProjectService } from './service';
import queryString from 'query-string'


const defaultValue = makePDF
  .toString()
  .split('\n')
  .slice(1, -1)
  .join('\n')
  .replace(/^ {2}/gm, '');

function App() {
  // window.close()
  const search = queryString.parse(window.location.search)
  const [value, setValue] = useState(defaultValue);
  const [project, setProject] = useState({});

  const onChange = (newValue) => {
    setValue(newValue);
  }

  const fetchData = async () => {
    const { id, token } = search
    let res = await ProjectService.get(id, token)
    console.log("RES", res.data);
    if (res.data) {
      setProject(res.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <React.Fragment>
      <Editor value={value} onChange={onChange} />
      <Viewer value={value} project={project} />
    </React.Fragment>
  );
}

export default App;