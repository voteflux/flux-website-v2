module Helpers.Json exposing (..)

import Helpers.Msgs exposing (HelperMsg(..))
import Json.Decode as Decode


decodePortResp : Decode.Decoder a -> Decode.Value -> (Result String a -> msg) -> HelperMsg msg
decodePortResp decoder val msgConstructor =
    OnPortResp <| msgConstructor <| Decode.decodeValue decoder val
