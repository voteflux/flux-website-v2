module Flux.MemberUI.Update exposing (..)

import Flux.MemberUI.Models exposing (Model)
import Flux.MemberUI.Msgs exposing (Msg(..))
import Flux.MemberUI.Routing exposing (parseRoute)
import Flux.Update
import Helpers.Location exposing (fixLocationQuery)
import Helpers.Msgs exposing (HelperMsg(..))
import Material
import Navigation exposing (newUrl)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FMsg fMsg ->
            let
                ( modelF, cmd ) =
                    Flux.Update.updateAuth fMsg model.flux
            in
            { model | flux = modelF } ! [ Cmd.map FMsg cmd ]

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


updateHelpers : HelperMsg Msg -> Model -> ( Model, Cmd Msg )
updateHelpers hMsg model =
    case hMsg of
        OnLocationChange loc ->
            let
                fixedLoc =
                    fixLocationQuery loc

                path =
                    ""

                params =
                    {}

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
