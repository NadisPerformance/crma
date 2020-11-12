%html
  %head
    %title Rapport
    %meta{charset:"UTF-8"}
    %link{href: "http://localhost:4008/static/css/bill.css", media: "all", rel: "stylesheet", type: "text/css"}
  %body
    %div
      %img{src:"http://localhost:4008/static/logo.png",width:"100px"}
    %div{style: "width: auto;   margin-left: 10px;"}
      %p{style:"font-size:14px"}
        %b
          CRMA
        %br
        N° 734 Bd Mly Abdellah
        %br
        65800 Taourirt
        %br
        MAROC
        %br
        +212 6 08 15 25 70
        %br
        www.mabroka.ma
        %br
    %div{style: "width: auto;   margin-right: 10px;"}
      %p{style:"font-size:14px; text-align:right"}
        %span{style:"font-weight:100%"}
        = customer.type ==0 ?customer.firstname + " "+ customer.lastname: customer.company_name
        %br
        =customer.address
        %br
        =customer.city
        %br
        MAROC
        %br
        =customer.phone
        %br
    %div
      %b
        Référence:
        =" FA"+id
      %br
      %b
        Date:
        =" "+createdAt
      %br
      %br
    %table{border: "1", cellpadding : "0", cellspacing : "0", style : "width: 100%;"}
      %thead
        %tr
          %td
            Prestation
          %td
            Nombre de jours
          %td
            Prix HT
          %td
            Prix TTC
      %tbody
        %tr
          %td
            =rows[0].libelle
          %td
            =rows[0].day_nbr
          %td
            =(rows[0].price_ht* rows[0].day_nbr )+" Dhs"
          %td
            =(rows[0].price_ttc *rows[0].day_nbr ) +" Dhs"
        %tr
          %td{colspan:"3", style :"text-align: right;"}
            Total HT:
          %td
            = total_ht+ " Dhs"
        %tr
          %td{colspan:"3", style:"text-align: right;"}
            Total TVA:
          %td
            = (total_ttc - total_ht) +" Dhs"
        %tr
          %td{colspan:"3", style: "text-align: right;"}
            Total TTC:
          %td
            = total_ttc +" Dhs"
    %p.footer
      Ste CRMA S.A.R.L 734 Bd Mouly Abdellah 65800 Taourirt / Tel: +212 6 08 15 25 70 RC: 295 Taourirt
      %br
      Patente: 12406877 IF: 14458449 CNSS: 9643835 ICE: 000008968000073 Site web: www.mabroka.ma - Email: contact@mabroka.ma
