const axios = require('axios');

const btoa = (string) => {
	return Buffer.from(string).toString('base64');
};

const getMicrosoftProfile = (pat) => {
	return axios
		.get(
			'https://app.vssps.visualstudio.com/_apis/profile/profiles/me?api-version=6.0',
			{
				headers: {
					Authorization: 'Basic ' + btoa('Basic' + ':' + pat),
				},
			}
		)
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			console.log(err);
		});
};

const getAllOrganizations = (publicAlias, pat) => {
	return axios
		.get(
			`https://app.vssps.visualstudio.com/_apis/accounts?memberId=${publicAlias}&api-version=6.0`,
			{
				headers: {
					Authorization: 'Basic ' + btoa('Basic' + ':' + pat),
				},
			}
		)
		.then(async (response) => {
			const organizations = response.data.value;
			let result = [];
			for (let i = 0; i < organizations.length; i++) {
				const projects = await getAllOrganizationProjects(
					organizations[i].accountName,
					pat
				);
				result.push({
					accountId: organizations[i].accountId,
					accountName: organizations[i].accountName,
					projectsCount: projects.count,
				});
			}
			console.log(result);
			return result;
		})
		.catch((err) => {
			console.log(err);
		});
};

const getAllOrganizationProjects = (organization, pat) => {
	return axios
		.get(
			`https://dev.azure.com/${organization}/_apis/projects?api-version=6.0`,
			{
				headers: {
					Authorization: 'Basic ' + btoa('Basic' + ':' + pat),
				},
			}
		)
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			return err.response;
		});
};

const getProjectDetail = (organization, projectId, pat) => {
	return axios
		.get(
			`https://dev.azure.com/${organization}/_apis/projects/${projectId}?api-version=6.0`,
			{
				headers: {
					Authorization: 'Basic ' + btoa('Basic' + ':' + pat),
				},
			}
		)
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			return err.response;
		});
};

const getWorkItemsList = (organization, project_id, pat) => {
	return axios
		.post(
			`https://dev.azure.com/${organization}/${project_id}/_apis/wit/wiql?api-version=5.1`,
			{
				query: 'Select * From WorkItems',
			},
			{
				headers: {
					Authorization: 'Basic ' + btoa('Basic' + ':' + pat),
				},
			}
		)
		.then((response) => {
			const arr = [];
			for (let i = 0; i < response.data.workItems.length; i++) {
				if (i < 200) {
					arr.push(response.data.workItems[i].id);
				}
			}
			return arr;
		})
		.then((arr) => {
			const workItems = getWorkItemsBatch(organization, project_id, arr, pat)
			return workItems
		})
		.catch((err) => {
			console.log(err);
		});
};

const getWorkItemsBatch = (organization, project, ids, pat) => {
	return axios
		.post(
			`https://dev.azure.com/${organization}/${project}/_apis/wit/workitemsbatch?api-version=5.1`,
			{
				ids: ids,
				fields: ['System.Id', 'System.Title', 'System.State'],
			},
			{
				headers: {
					Authorization: 'Basic ' + btoa('Basic' + ':' + pat),
				},
			}
		)
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			console.log(err);
		});
};

const devOpsApi = {
	getMicrosoftProfile,
	getAllOrganizations,
	getAllOrganizationProjects,
	getProjectDetail,
	getWorkItemsList,
	getWorkItemsBatch,
};

module.exports = devOpsApi;
