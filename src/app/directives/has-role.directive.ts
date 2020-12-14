import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from '../service/auth.service';

@Directive({
    selector: '[appHasRole]'
})
export class HasRoleDirective {
    @Input() appHasRole: string[];
    roles: string[];

    constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, private authService: AuthService) {
        this.roles = JSON.parse(localStorage.getItem('roles'));
    }

    ngOnInit(): void {
        if (!this.roles) {
            this.viewContainerRef.clear();
            return;
        }

        if (this.roles.some(role => this.appHasRole.includes(role))) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainerRef.clear();
        }
    }
}
