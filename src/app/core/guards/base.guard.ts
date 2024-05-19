import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageUtils } from '../utils/localStorageUtils';


export abstract class BaseGuard {

    private localStorageUtils = new LocalStorageUtils();

    constructor(protected router: Router,
                protected toastr: ToastrService){}
    
    protected validarClaims(routeAc: ActivatedRouteSnapshot) : boolean {

        if(!this.localStorageUtils.getToken()){
            this.router.navigate(['/autenticar/login'], { queryParams: { returnUrl: this.router.url }});
        }  

        let user = this.localStorageUtils.getUser();
        let claim: any = routeAc.data[0];
        if (claim !== undefined) {
            let claim = routeAc.data[0]['claim'];

            if (claim) {
                if (!user.claims) {
                    this.AccessDeniedNavigation();
                }
                
                let userClaims = user.claims.find(x => x.value === claim.value);

                if(!userClaims){
                    this.AccessDeniedNavigation();
                }

                let valoresClaim = userClaims.value as string;
                
                if (!valoresClaim.includes(claim.value)) {
                    this.AccessDeniedNavigation();
                    return false;
                }
            }
        }

        return true;  
    }

    private AccessDeniedNavigation() {
      this.toastr.error('Acesso Negado!', 'Opa :(');
    }    
}