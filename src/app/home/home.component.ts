import { Component, NgZone } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService} from '../_services/user.service';
import { AuthenticationService } from "../_services/authentication.service";
import { MachineService } from "../_services/machine.service"; 
import { ToastrService } from 'ngx-toastr';
import { ResourceService } from "../_services/resource.service"

declare var $:any;

@Component({ templateUrl: 'home.component.html' ,styleUrls: ['./home.component.css']})
export class HomeComponent {
    loading = false;
    users: User[];
    machines = {
        loaded: true,
        data: []
    }

    resources = {
        loaded: true,
        data: null
    }

    newMachine = {
        id: null,
        visible: false,
        name: null,
        os:  null,
        ip_addr: null,
        access_user: null,
        access_pass: null,
        rules: [],
    }

    newMachineRule = {
        visible: false,
        machine: null,
    }
    constructor(
        private userService: UserService,
        private machineService: MachineService,
        private resourceSerivce: ResourceService,
        private toastr: ToastrService,
        private zone: NgZone,
        ) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
        this.getResources();
    }

    getMachines() {
        this.machineService.getAll().subscribe(
            (d:any) => {
                this.machines.loaded = true;
                this.machines.data = d.data;
            }
        )
    }

    getResources() {
        this.resources.data = this.resourceSerivce.getAll();
    }

    openNewMachine() {
        this.newMachine.visible = true;
    }

    clearNewMachine() {
        this.newMachine = {
            id: null,
            visible: false,
            name: null,
            os:  null,
            ip_addr: null,
            access_user: null,
            access_pass: null,
            rules : []
        }
    }

    addNewMachine() {
        this.newMachine.id = Math.floor(Math.random() * 5000);
        this.machines.data.push(this.newMachine);
        this.clearNewMachine();
    }

    addNewRule(machine) {
        this.newMachineRule.machine = machine;
        this.newMachineRule.visible = true;
    }

    addRuleToMachine(resource,rule,machine) {
        //construct the description 
        let rsc_input = $(`#rsc-input-${resource.id}`).val();
        let rsc_rule  = (rule.input) ? $(`#rsc-rule-${rule.id}`).val() : "";
        let description = `The "${rsc_input}" ${resource.name} ${rule.description} ${rsc_rule}`;
        let created_rule_index = null; 
        //find the concerned machine
        for(var i = 0; i < this.machines.data.length; i++) {
            if(this.machines.data[i].id == machine.id) {
                this.machines.data[i].rules.push({
                    id : Math.floor(Math.random() * 5000),
                    description: description,
                    loaded: false,
                    respected: false
                });
                created_rule_index = this.machines.data[i].rules.length - 1;
                break;
            }
        }
        console.log(created_rule_index);
        this.toastr.success("Congrats!",`Rule added successfully to the ${machine.name} Machine`);

        this.zone.run( () => {
            setTimeout( () => {
                this.machines.data[i].rules[created_rule_index].respected = false;
                this.machines.data[i].rules[created_rule_index].loaded = true;
            },20000);
        });
    }
}