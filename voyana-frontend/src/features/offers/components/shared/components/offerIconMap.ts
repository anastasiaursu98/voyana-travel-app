import AirportShuttleRoundedIcon from "@mui/icons-material/AirportShuttleRounded";
import BeachAccessRoundedIcon from "@mui/icons-material/BeachAccessRounded";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CoffeeRoundedIcon from "@mui/icons-material/CoffeeRounded";
import DirectionsBoatFilledOutlinedIcon from "@mui/icons-material/DirectionsBoatFilledOutlined";
import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FamilyRestroomRoundedIcon from "@mui/icons-material/FamilyRestroomRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import FreeBreakfastRoundedIcon from "@mui/icons-material/FreeBreakfastRounded";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LocalBarRoundedIcon from "@mui/icons-material/LocalBarRounded";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PoolRoundedIcon from "@mui/icons-material/PoolRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import RoomServiceRoundedIcon from "@mui/icons-material/RoomServiceRounded";
import SmokeFreeRoundedIcon from "@mui/icons-material/SmokeFreeRounded";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import TerrainOutlinedIcon from "@mui/icons-material/TerrainOutlined";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { ComponentType } from "react";
import type { OfferIconName } from "../../../types/offerDetails.types";

const offerIconMap = {
  activity: ExploreOutlinedIcon,
  airportShuttle: AirportShuttleRoundedIcon,
  bar: LocalBarRoundedIcon,
  beach: BeachAccessRoundedIcon,
  briefcase: BusinessCenterOutlinedIcon,
  breakfast: FreeBreakfastRoundedIcon,
  calendar: CalendarMonthOutlinedIcon,
  check: CheckCircleOutlineRoundedIcon,
  coffee: CoffeeRoundedIcon,
  cruise: DirectionsBoatFilledOutlinedIcon,
  family: FamilyRestroomRoundedIcon,
  fitness: FitnessCenterRoundedIcon,
  hotel: HotelOutlinedIcon,
  location: LocationOnOutlinedIcon,
  meal: LocalDiningOutlinedIcon,
  mountain: TerrainOutlinedIcon,
  pool: PoolRoundedIcon,
  restaurant: RestaurantRoundedIcon,
  roomService: RoomServiceRoundedIcon,
  smokeFree: SmokeFreeRoundedIcon,
  spa: SpaOutlinedIcon,
  transport: DirectionsBusFilledOutlinedIcon,
} satisfies Record<OfferIconName, ComponentType<SvgIconProps>>;

export const getOfferIconComponent = (
  iconName: OfferIconName | undefined,
): ComponentType<SvgIconProps> => {
  if (iconName === undefined) {
    return InfoOutlinedIcon;
  }

  return offerIconMap[iconName] ?? InfoOutlinedIcon;
};
