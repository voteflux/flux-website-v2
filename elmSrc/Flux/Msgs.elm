module Flux.Msgs exposing (..)

import Flux.API as API exposing (AuthTokenApiResp, GenApiResp, GetRolesResp)
import RemoteData exposing (WebData)


type FluxMsg
    = UpdateAuthenticated (Maybe String)
    | SendAuthEmail String
    | OnSentAuthEmail (WebData GenApiResp)
    | OnAuthTokenResp (WebData AuthTokenApiResp)
    | OnGetRolesResp (WebData GetRolesResp)
    | OnError String
