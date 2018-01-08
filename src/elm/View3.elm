module View exposing (..)

import Html exposing (Html)
import Style
    exposing
        ( StyleSheet
        , Style
        , style
        , hover
        , cursor
        )
import Style.Font as Font
import Style.Border as Border
import Style.Color as Color
import Color
    exposing
        ( darkCharcoal
        , white
        , lightGrey
        , blue
        , red
        , black
        )
import Style.Transition as Transition
import Element
    exposing
        ( layout
        , column
        , row
        , el
        , text
        )
import Element.Attributes
    exposing
        ( center
        , width
        , px
        , spacing
        , paddingTop
        , paddingBottom
        , paddingXY
        , alignBottom
        , spread
        )


-- view : Model -> Html Msg
-- view model =
--     div []
--         []
-- -- [ page model ]
-- page : Model -> Html Msg
-- page model =
--     Html.map FilesMsg (Etls.List.view model.directories model.files)


{-| The type we use for identifiers for our styles.
-}
type Styles
    = None
    | Main
    | Page
    | Logo
    | NavOption
    | Box
    | Container
    | Label
    | Banner


sansSerif : List Style.Font
sansSerif =
    [ Font.font "helvetica"
    , Font.font "arial"
    , Font.font "sans-serif"
    ]


{-| First, we create a stylesheet.
Styles only deal with properties that are not related to layout, position, or size.
Generally all properties only have one allowed unit, which is usually px.
If you want to use something like em, you should check out the `Style.Scale` module, which will show how to make something similar to `em`.
-}
stylesheet : StyleSheet Styles variation
stylesheet =
    Style.styleSheet
        [ style None [] -- It's handy to have a blank style
        , style Main
            [ Border.all 1 -- set all border widths to 1 px.
            , Color.text darkCharcoal
            , Color.background white
            , Color.border lightGrey
            , Font.typeface sansSerif
            , Font.size 16
            , Font.lineHeight 1.3 -- line height, given as a ratio of current font size.
            ]
        , style Page
            [ Border.all 5
            , Border.solid
            , Color.text darkCharcoal
            , Color.background white
            , Color.border lightGrey
            ]
        , style Label
            [ Font.size 25 -- set font size to 25 px
            , Font.center
            ]
        , style Logo
            [ Font.size 25
            , Font.typeface sansSerif
            ]
        , style NavOption
            [ Font.size 16
            , Font.typeface sansSerif
            ]
        , style Box
            [ Transition.all
            , Color.text white
            , Color.background blue
            , Color.border blue
            , Border.rounded 3 -- round all borders to 3px
            , hover
                [ Color.text white
                , Color.background red
                , Color.border red
                , cursor "pointer"
                ]
            ]
        , style Container
            [ Color.text black
            , Color.background lightGrey
            , Color.border lightGrey
            ]
        , style Banner
            [ Color.background blue ]
        ]


view : a -> Html msg
view model =
    layout stylesheet <|
        column None
            []
            [ navigation
            , el None [ center, width (px 800) ] <|
                column Main
                    [ paddingTop 50, paddingBottom 50 ]
                    []

            -- (List.concat
            --     [ viewTextLayout
            --     , viewRowLayouts
            --     , viewGridLayout
            --     , viewNamedGridLayout
            --     ]
            -- )
            ]


navigation : Element.Element Styles variation msg
navigation =
    row None
        [ spread, paddingXY 80 20 ]
        [ el Logo [] (text "Style Elements")
        , row None
            [ spacing 20, alignBottom ]
            [ el NavOption [] (text "share")
            , el NavOption [] (text "about")
            , el NavOption [] (text "user profile")
            ]
        ]
