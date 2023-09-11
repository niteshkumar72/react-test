import axios from "axios";
import React, { useState } from "react";
import "./App.css";
const DummyResponse = [
	{
		question:
			"error: error validating deployment.yaml: error validating data:ValidationError(Deployment.spec.template.spec.containers[0].ports[0]): missing required field containerPort inio.k8s.api.core.v1.ContainerPort",
		solution:
			'ANSWER: The error is due to the missing "containerPort" field in the deployment.yaml file. In your deployment.yaml file, under the spec.containers section, you need to specify the "containerPort". For example, in the provided context, the "containerPort" is set to 80. This is required for Kubernetes to know which port the container is listening on.\nSource: deployment_description.docx',
		title: "deployment_yaml_error.d",
	},
];
function App() {
	const [question, setQuestion] = useState("");
	const [response, setResponse] = useState([]);
	const getQuestion = (event) => {
		setQuestion(event.target.value);
	};
	const submitQuestion = (e) => {
		const data = {
			action: "next",
			message: {
				id: "d47a9ac7-d140-4614-8f65-7f8047cd5220",
				author: {
					role: "user",
				},
				content: {
					content_type: "string",
					parts: question,
				},
				audio: false,
			},
			parent_message_id: "7affc74a-ac80-4e00-a4ba-ad0ca79953dc",
		};
		e.preventDefault();
		axios.post("http://localhost:8000/conversation", data)
			.then((response) => {
				console.log(response.status, response.data.token);
			})
			.catch((error) => {
				if (error.response) {
					console.log(error.response);
					console.log("server responded");
				} else if (error.request) {
					console.log("network error");
				} else {
					console.log(error);
				}
			});
		setQuestion("");
	};
	return (
		<div>
			<div>
				<label>Question : </label>
				<input
					name="question"
					type="text"
					value={question}
					className="inputField"
					onChange={getQuestion}
				/>
				<br />
				<button onClick={submitQuestion}>proceed</button>
			</div>
			<div>
				{DummyResponse.map((data) => {
					return (
						<div>
							<div>{data.question}</div>
							{/* <div>{data.title}</div>
							<div>{data.solution}</div> */}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
