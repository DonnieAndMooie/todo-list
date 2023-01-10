//Class for creating project objects
class Project{
    constructor(title){
        this.title = title;
    }
}

//Returns a project object
function createNewProject(){
    const title = document.getElementById("project-title").value
    const newProject = new Project(title)
    return newProject

}

export { Project, createNewProject}