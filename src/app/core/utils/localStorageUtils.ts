export class LocalStorageUtils {

    public getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    public getUserClaims() {
        const userData = JSON.parse(localStorage.getItem('user'));

        let claims = userData?.claims;

        const organizedClaims: {[claimType: string]: string[]} = {};
  
        claims.forEach(claim => {
        const { claimType, claimValue } = claim;
    
            if (!organizedClaims.hasOwnProperty(claimType)) {
                organizedClaims[claimType] = [];
            }
        
            if (!organizedClaims[claimType].includes(claimValue)) {
                organizedClaims[claimType].push(claimValue);
            }
        });
  
        return organizedClaims;
    }

    public saveLocalUserData(response: any) {
        this.saveToken(response.token);
        this.saveUser(response);
    }

    public cleanLocalUserData() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    public getToken(): string | null {
        return localStorage.getItem('token');
    }

    public saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    public saveUser(user: string) {
        localStorage.setItem('user', JSON.stringify(user));
    }

}