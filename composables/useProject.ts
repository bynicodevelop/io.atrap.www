import ProjectRepository from "~~/repositories/ProjectRepository";

export const useProject = () => {
    const route = useRoute();
    const projectRepository = <ProjectRepository>useState('projectRepository').value;

    const { projectid } = route.params;

    const project = ref({});

    const getProject = () => {
        projectRepository.getProject(projectid as string, (projectModel) => {
            project.value = projectModel;
        });
    }

    const updateProject = async () => {
        await projectRepository.updateProject(project.value);
    }

    return {
        project,
        getProject,
        updateProject,
    }
}