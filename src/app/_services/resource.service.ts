import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ResourceService {
    constructor(private http: HttpClient) { }

    getAll() {
        // return this.http.get(`${environment.apiUrl}/resources`);
        return [
            {
                id: "1",
                name : "Command",
                description: "Run commands remotely and verify their outputs",
                inputs: [
                    { id: "1",  title: "Command to run :" }
                ],
                rules: [
                    { 
                        id: "1",
                        description: "output (stdout) must be equal to :",
                        input : true
                    },
                    {
                        id: "2",
                        description: "stderr must be equal to :",
                        input : true
                    }
                ]
            },
            {
                id: "2",
                name : "File",
                description: "Test all system file types, including files, directories, symbolic links, etc.",
                inputs: [
                    { id: "2",  title: "file to test (use absolute paths) :" }
                ],
                rules: [
                    { 
                        id: "3",
                        description: "must exist",
                        input : false
                    },
                    {
                        id: "4",
                        description: "must be readable",
                        input : false
                    },
                    {
                        id: "5",
                        description: "must be writable",
                        input: false
                    }
                ]
            },
            {
                id: "3",
                name : "Package",
                description: "Test if the named package and/or package version is installed on the system.",
                inputs: [
                    { id: "3",  title: "Package to test :" }
                ],
                rules: [
                    { 
                        id: "6",
                        description: "must be installed",
                        input : false
                    },
                    {
                        id: "7",
                        description: "version must be equal to :",
                        input : true
                    }
                ]
            },
        ];
    }
    
    getById(id) {
        return this.http.get(`${environment.apiUrl}/resources/${id}`);
    }
}