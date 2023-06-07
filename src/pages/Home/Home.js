import React, {useEffect, useState} from 'react';
import {NavLink, Table} from "reactstrap";
import {getFiles} from "../../services/files";
import {Link} from "react-router-dom";

export default function Home() {
    const [files, setFiles] = useState([]);
    const [filesErrorMessage, setFilesErrorMessage] = useState("");

    useEffect(() => {
        const fetchFiles = async () => {
            const response = await getFiles()
                .then(response => setFiles(response.data))
                .catch(error => {
                    setFilesErrorMessage(JSON.stringify(error.response.data))
                    console.error(filesErrorMessage);
                });
        };
        fetchFiles();
    }, []);

    return (
        <Table
            hover
            responsive
            size=""
            striped
        >
            <thead>
            <tr>
                <th>
                    #
                </th>
                <th>
                    File
                </th>
                <th>
                    Result
                </th>
                <th>
                    Action
                </th>
            </tr>
            </thead>
            <tbody>
            {files.map(item => (
                <tr key={item.id}>
                    <th scope="row">
                        {item.id}
                    </th>
                    <td>
                        <Link to={item.csv} target="_blank" download>{item.csv}</Link>
                    </td>
                    <td>
                        {item.result || "---"}
                    </td>
                    <td>
                        <NavLink href={'file/detail/'}>Get description</NavLink>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}