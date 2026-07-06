import { useLocation } from "react-router-dom";
import {
  AUTH_BACK_TARGETS,
  AUTH_ROUTE_VALUES,
} from "../constants/authLayout.constants";
import type { AuthRouteState } from "../types/authLayout.types";

export function useAuthBackTarget() {
  const location = useLocation();
  const routeState = location.state as AuthRouteState | null;
  const stateBackTarget = routeState?.backTo;

  if (stateBackTarget && AUTH_ROUTE_VALUES.has(stateBackTarget)) {
    return stateBackTarget;
  }

  return AUTH_BACK_TARGETS[location.pathname];
}
