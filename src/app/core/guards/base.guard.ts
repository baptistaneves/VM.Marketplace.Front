import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageUtils } from '../utils/localStorageUtils';


export abstract class BaseGuard {

    private localStorageUtils = new LocalStorageUtils();

    constructor(protected router: Router,
                protected toastr: ToastrService){}
    
    protected validarClaims(routeAc: ActivatedRouteSnapshot) : boolean {

        if(!this.localStorageUtils.getToken()){
            this.router.navigate(['/auth/signin/'], { queryParams: { returnUrl: this.router.url }});
        }  

        let user = this.localStorageUtils.getUser();

        if(user.hasLoggedInBefore === false){
            this.router.navigate(['/auth/mudar-senha/'], { queryParams: { returnUrl: this.router.url }});
        }

        let claim: any = routeAc.data[0];
        if (claim !== undefined) {
            let claim = routeAc.data[0]['claim'];

            if (claim) {
                if (!user.claims) {
                    this.AccessDeniedNavigation();
                }
                
                let userClaims = user.claims.find(x => x.claimValue === claim.claimValue);

                if(!userClaims){
                    this.AccessDeniedNavigation();
                }

                let valoresClaim = userClaims.claimValue as string;
                
                if (!valoresClaim.includes(claim.claimValue)) {
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