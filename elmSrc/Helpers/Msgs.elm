module Helpers.Msgs exposing (..)

import Navigation exposing (Location)


type HelperMsg msg
    = OnErrLog String
    | OnLocationChange Location
    | NewUrl String
    | OnPortResp msg
