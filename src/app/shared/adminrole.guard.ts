import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const adminroleGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem("usertype") == "admin")

    return true;

  else
    return false;

};
