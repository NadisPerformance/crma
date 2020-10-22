%html
  %head
    %title Rapport
    %meta{charset:"UTF-8"}
    %link{href: "http://localhost:4008/static/css/contract.css", media: "all", rel: "stylesheet", type: "text/css"}
  %body

    %div
      %img{src:"http://localhost:4008/static/logo.png",width:"100px"}
      %span.title= "Contrat de location N° "+id
    %h5= "Client emprunteur"
    %table
      %tr
        %td
          %span.lbl
            Nom:
          %span.lbl_value
            =customer.lastname
        %td
          %span.lbl
            Prénom:
          %span.lbl_value
            =customer.firstname
        %td
          %span.lbl
            Né le :
          %span.lbl_value
            20/10/1990
      %tr
        %td
          %span.lbl
            N° de permet de conduire:
          %span.lbl_value
            21/10/2020
        %td
        %td
          %span.lbl
            Délivré le:
          %span.lbl_value
            30/11/2002
      %tr
        %td
          %span.lbl
            N° de téléphone:
          %span.lbl_value
            =customer.phone
        %td
          %span.lbl
            Adresse E-mail:
          %span.lbl_value
            =customer.email
        %td

    %h5= "Véhicule de prêt"
    %table
      %tr
        %td
          %span.lbl
            Marque:
          %span.lbl_value
            =car.brand.name
        %td
          %span.lbl
            Modèle:
          %span.lbl_value
            =car.model
        %td
          %span.lbl
            N° d\'immatriculation:
          %span.lbl_value
            =car.plate_number
      %tr
        %td
          %span.lbl
            Date de mise en circulation:
          %span.lbl_value
            21/10/2020
        %td
        %td
          %span.lbl
            N° de série:
          %span.lbl_value
            =car.chassis_number
      %tr
        %td
          %span.lbl
            Kilométrage de départ:
          %span.lbl_value
            .................
        %td
          %span.lbl
            Kilométrage de retour:
          %span.lbl_value
            ................
        %td
          %span.lbl
            Kilométrage parcouru:
          %span.lbl_value
            ...............
    %h5= "Observation sur l'état du véhicule"
    %table
      %tr
        %td
          Au départ
          %hr 
          %span.lbl= "Niveau du carburant:"
          %span.lbl_value="......"
          %br
          %span.lbl="Auto-radio :"
          %span.lbl_value="......"
          %br
          %span.lbl="Roue secours :"
          %span.lbl_value="......"
          %br
          %span.lbl="Pneu AV bon état :"
          %span.lbl_value="......"
          %br
          %span.lbl="Pneu AR bon état :"
          %span.lbl_value="......"
          %br
          %span.lbl= "Gilet :"
          %span.lbl_value="......"
          %br
          %span.lbl="Triangle :"
          %span.lbl_value="......"
          %br
          %span.lbl="Rayure :"
          %span.lbl_value="......"
          %br
          %span.lbl="Choc : "
          %span.lbl_value="......"
          %br
          %span.lbl="Cassé : "
          %span.lbl_value="......"
          %br
          %span.lbl="Observations :"
          %span.lbl_value="......................"
          %br
          %span.lbl="Fait à ......................."
          %span.lbl="le ........."
          %br
          %span.lbl= "Signature :"
          %br
        %td
          Au retour
          %hr
          %span.lbl= "Niveau du carburant:"
          %span.lbl_value="......"
          %br
          %span.lbl="Auto-radio :"
          %span.lbl_value="......"
          %br
          %span.lbl="Roue secours :"
          %span.lbl_value="......"
          %br
          %span.lbl="Pneu AV bon état :"
          %span.lbl_value="......"
          %br
          %span.lbl="Pneu AR bon état :"
          %span.lbl_value="......"
          %br
          %span.lbl= "Gilet :"
          %span.lbl_value="......"
          %br
          %span.lbl="Triangle :"
          %span.lbl_value="......"
          %br
          %span.lbl="Rayure :"
          %span.lbl_value="......"
          %br
          %span.lbl="Choc : "
          %span.lbl_value="......"
          %br
          %span.lbl="Cassé : "
          %span.lbl_value="......"
          %br
          %span.lbl="Observations :"
          %span.lbl_value="......................"
          %br
          %span.lbl="Fait à ......................."
          %span.lbl="le ........."
          %br
          %span.lbl= "Signature :"
          %br

    %h5= "Conditions générales de prêt"
    %p
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada dolor nec condimentum venenatis. Mauris malesuada, erat at accumsan egestas, ex mi sollicitudin nunc, nec consequat urna lectus in elit. Sed vel velit vitae velit posuere dignissim non et sem. Nam id venenatis sapien, quis dignissim metus. Sed posuere varius dui. In in porta leo. Nullam sit amet imperdiet est, a faucibus lectus. Proin venenatis ligula nec velit hendrerit, sed volutpat diam sollicitudin. Maecenas vel sapien eget tortor auctor bibendum sed vitae mauris. Donec sit amet diam posuere, tincidunt nibh vitae, auctor urna.
    %p
      Morbi semper erat at efficitur ornare. Etiam fringilla odio a maximus ultricies. Sed vestibulum dolor et iaculis ultricies. Cras consequat luctus diam ut ultricies. Nam lorem nisl, tincidunt vitae dapibus ac, bibendum in neque. Nam laoreet nec mauris eu molestie. Vivamus sodales arcu egestas ultricies dapibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum eu imperdiet lorem.
    %p
      Proin porta mauris et dui ultrices tempor. Proin rutrum, orci quis malesuada viverra, odio magna rutrum eros, ut rhoncus leo lectus eget felis. Ut justo sapien, commodo id metus at, mollis venenatis est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur vitae faucibus tellus. Donec vel augue sapien. Etiam vestibulum leo quis semper gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
    %p
      Phasellus non elementum turpis. Integer ornare tincidunt neque eleifend placerat. Donec ut lorem ac orci mattis sagittis non ut sem. Sed ut urna enim. Nulla pharetra pellentesque enim id pulvinar. Sed quis nisi ac arcu volutpat venenatis nec a erat. Nullam odio diam, blandit convallis laoreet in, cursus quis quam. Aenean ultricies bibendum tincidunt. Donec et justo erat. Phasellus luctus urna eu odio ultrices vulputate. In ut nulla a dolor porttitor pharetra. Phasellus euismod sapien sit amet tortor vulputate sagittis. Proin eu lorem non magna aliquam elementum.
    %p
      Pellentesque dictum tellus justo, at bibendum massa posuere a. Praesent efficitur vulputate faucibus. Sed auctor, dui at porta convallis, justo ex varius nunc, sit amet porttitor massa arcu tempor tellus. Vestibulum eget semper sapien, eget scelerisque tellus. Etiam facilisis tristique eros. Aliquam eget nisl id magna mollis dictum. Duis urna odio, congue id euismod eu, pretium non velit. Integer dignissim purus quis risus finibus mattis sit amet eget dui. Ut sed metus auctor, luctus nisl nec, pulvinar eros.
