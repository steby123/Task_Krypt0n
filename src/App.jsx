import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelector from "./components/NoProjectSelector";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  })

  const handleAddTask = (text) => {
    setProjectState((prevState) => {
      const taskId = Math.random();
      const newTask  = {
        text: text,
        projectId:prevState.selectedProjectId,
        id:taskId
      };
      return{
        ...prevState,
        tasks: [...prevState.tasks,newTask ]
      }
    })
  }

  const handleDeleteTask = (id) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks:prevState.tasks.filter((project) => project.id !== id )
      }
    });
  }

  const handleSelectProject = (id) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    });
  }

  const handleCancelProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId:undefined,
      }
    });
  }

  const handleStartAddProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId:null,
      }
    });
  }
  
  const handleProject = (projectData) => {
    setProjectState((prevState) => {
      const projectId = Math.random();
      const newProject  = {
        ...projectData,
        id:projectId
      };
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects,newProject ]
      }
    })
  }

  const handleDelete = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId:undefined,
        projects:prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId )
      }
    });
  }
 
  console.log(projectState);

  const selectedProject =  projectState.projects.find((project) => project.id === projectState.selectedProjectId);

  let content = (
    <SelectedProject 
      project={selectedProject} 
      onDelete={handleDelete} 
      onAddTask={handleAddTask} 
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
  );

  if(projectState.selectedProjectId === null){
    content = <NewProject onAdd={handleProject} onCancel={handleCancelProject}/>
  }else if(projectState.selectedProjectId === undefined){
    content = <NoProjectSelector onStartAddProject={handleStartAddProject}/>
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar 
        onStartAddProject={handleStartAddProject} 
        project={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
