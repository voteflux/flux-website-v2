module Flux.Update exposing (..)

import Flux.API exposing (GenApiResp)
import Flux.Auth as Auth
import Flux.Models exposing (AuthModel, FModel)
import Flux.Msgs exposing (FluxMsg(..))
import RemoteData exposing (RemoteData(..))
import Task


updateAuth : FluxMsg -> FModel a -> ( FModel a, Cmd FluxMsg )
updateAuth msg model =
    case msg of
        UpdateAuthenticated token ->
            ( { model | token = token }, Auth.getRoles model.token )

        SendAuthEmail email ->
            model ! [ Auth.sendAuthEmail email ]

        OnSentAuthEmail data ->
            webDataHelper model data (\_ -> { model | checkEmail = True } ! [])

        OnAuthTokenResp authResp ->
            webDataHelper model
                authResp
                (\{ s } -> { model | token = s } ! [ Auth.getRoles model.token ])

        OnGetRolesResp resp ->
            webDataHelper model resp (\{ roles } -> { model | roles = Just roles } ! [])

        OnError err ->
            { model | errors = err :: model.errors } ! []


type alias MinResp a =
    { a | status : String, error : String }


webDataHelper : FModel a -> RemoteData b (MinResp d) -> (MinResp d -> ( FModel a, Cmd FluxMsg )) -> ( FModel a, Cmd FluxMsg )
webDataHelper model data successF =
    case data of
        Success d_ ->
            if d_.status == "error" then
                model ! [ Task.perform OnError (Task.succeed d_.error) ]
            else
                successF d_

        Failure e_ ->
            model ! [ Task.perform OnError (Task.succeed <| toString e_) ]

        _ ->
            model ! []
