module Flux.MemberUI.Update exposing (..)

import DefaultDict
import Dict
import Flux.MemberUI.Models exposing (Model)
import Flux.MemberUI.Msgs exposing (Msg(..))
import Flux.MemberUI.Routing exposing (parseRoute)
import Flux.MemberUI.Views.AuthV exposing (authBtnId)
import Flux.Models exposing (FModel)
import Flux.Msgs exposing (FluxMsg(OnAuthTokenResp, OnSentAuthEmail))
import Flux.Update
import Helpers.Location exposing (fixLocationQuery)
import Helpers.Msgs exposing (HelperMsg(..))
import Material
import Material.Helpers exposing (map1st, map2nd)
import Material.Snackbar as Snack
import Navigation exposing (newUrl)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FMsg fMsg ->
            let
                ( modelF, cmd ) =
                    Flux.Update.updateAuth fMsg model.flux

                ( model_, cmd_ ) =
                    fMsgPre fMsg model
            in
            { model_ | flux = modelF } ! [ cmd_, Cmd.map FMsg cmd ]

        HMsg hMsg ->
            updateHelpers hMsg model

        SetPage page ->
            { model | page = page } ! []

        Mdl msg_ ->
            Material.update Mdl msg_ model

        NOP ->
            model ! []

        SelectTab int ->
            { model | selectedTab = int } ! []

        UpdateField i str ->
            { model | inputs = Dict.insert i str model.inputs } ! []

        DisableBtn i ->
            { model | disabled = DefaultDict.insert i True model.disabled } ! []

        EnableBtn i ->
            { model | disabled = DefaultDict.insert i False model.disabled } ! []

        MsgMap msgs ->
            updateMany msgs model

        Snack msg_ ->
            Snack.update msg_ model.snack
                |> map1st (\s -> { model | snack = s })
                |> map2nd (Cmd.map Snack)


updateMany : List Msg -> Model -> ( Model, Cmd Msg )
updateMany msgs model =
    let
        foldF msg ( m, cmd ) =
            let
                ( m_, cmd_ ) =
                    update msg m
            in
            ( m_, Cmd.batch [ cmd, cmd_ ] )
    in
    List.foldl foldF ( model, Cmd.none ) msgs


updateHelpers : HelperMsg Msg -> Model -> ( Model, Cmd Msg )
updateHelpers hMsg model =
    case hMsg of
        OnLocationChange loc ->
            let
                fixedLoc =
                    fixLocationQuery loc

                page =
                    parseRoute fixedLoc
            in
            ( { model | location = fixedLoc, page = page }, Cmd.none )

        OnErrLog str ->
            ( { model | errors = ( str, True ) :: model.errors }, Cmd.none )

        OnPortResp msg ->
            update msg model

        NewUrl str ->
            ( model, newUrl <| "#" ++ str )


mkToast : String -> Model -> ( Model, Cmd Msg )
mkToast txt model =
    let
        toast =
            Snack.toast 0 txt

        ( snackM, cmd ) =
            Snack.add toast model.snack
    in
    ( { model | snack = snackM }, Cmd.map Snack cmd )


fMsgPre : FluxMsg -> Model -> ( Model, Cmd Msg )
fMsgPre fMsg model =
    case fMsg of
        OnSentAuthEmail _ ->
            update (EnableBtn authBtnId) model

        OnAuthTokenResp _ ->
            update (HMsg <| NewUrl "restart") model

        Flux.Msgs.OnError err ->
            mkToast err model

        _ ->
            model ! []
