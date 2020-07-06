PGDMP     	    #                x            pruebaContenido    12.2    12.2     "           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            #           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            $           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            %           1262    16586    pruebaContenido    DATABASE     �   CREATE DATABASE "pruebaContenido" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Spain.1252' LC_CTYPE = 'Spanish_Spain.1252';
 !   DROP DATABASE "pruebaContenido";
                postgres    false            �            1259    16600 	   categoria    TABLE     d   CREATE TABLE public.categoria (
    id integer NOT NULL,
    name character varying(20) NOT NULL
);
    DROP TABLE public.categoria;
       public         heap    postgres    false            �            1259    16598    categoria_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.categoria_id_seq;
       public          postgres    false    203            &           0    0    categoria_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.categoria_id_seq OWNED BY public.categoria.id;
          public          postgres    false    202            �            1259    16608 	   contenido    TABLE     J  CREATE TABLE public.contenido (
    id integer NOT NULL,
    titulo character varying(20) NOT NULL,
    imagen character varying(30) NOT NULL,
    enlace character varying(250) NOT NULL,
    contenido character varying(250) NOT NULL,
    fecha_limite date NOT NULL,
    etiqueta character varying(50),
    categoria_id integer
);
    DROP TABLE public.contenido;
       public         heap    postgres    false            �            1259    16606    contenido_id_seq    SEQUENCE     �   CREATE SEQUENCE public.contenido_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.contenido_id_seq;
       public          postgres    false    205            '           0    0    contenido_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.contenido_id_seq OWNED BY public.contenido.id;
          public          postgres    false    204            �            1259    16643    contenido_usuario    TABLE     �   CREATE TABLE public.contenido_usuario (
    usuario_id integer NOT NULL,
    contenido_id integer NOT NULL,
    fecha date NOT NULL
);
 %   DROP TABLE public.contenido_usuario;
       public         heap    postgres    false            �            1259    16635    usuario    TABLE     �   CREATE TABLE public.usuario (
    numero_doc integer NOT NULL,
    nombre character varying(20) NOT NULL,
    password text NOT NULL
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �
           2604    16603    categoria id    DEFAULT     l   ALTER TABLE ONLY public.categoria ALTER COLUMN id SET DEFAULT nextval('public.categoria_id_seq'::regclass);
 ;   ALTER TABLE public.categoria ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            �
           2604    16611    contenido id    DEFAULT     l   ALTER TABLE ONLY public.contenido ALTER COLUMN id SET DEFAULT nextval('public.contenido_id_seq'::regclass);
 ;   ALTER TABLE public.contenido ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    205    205                      0    16600 	   categoria 
   TABLE DATA           -   COPY public.categoria (id, name) FROM stdin;
    public          postgres    false    203   �                 0    16608 	   contenido 
   TABLE DATA           p   COPY public.contenido (id, titulo, imagen, enlace, contenido, fecha_limite, etiqueta, categoria_id) FROM stdin;
    public          postgres    false    205                     0    16643    contenido_usuario 
   TABLE DATA           L   COPY public.contenido_usuario (usuario_id, contenido_id, fecha) FROM stdin;
    public          postgres    false    207   �                 0    16635    usuario 
   TABLE DATA           ?   COPY public.usuario (numero_doc, nombre, password) FROM stdin;
    public          postgres    false    206   �       (           0    0    categoria_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.categoria_id_seq', 2, true);
          public          postgres    false    202            )           0    0    contenido_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.contenido_id_seq', 6, true);
          public          postgres    false    204            �
           2606    16605    categoria categoria_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.categoria DROP CONSTRAINT categoria_pkey;
       public            postgres    false    203            �
           2606    16616    contenido contenido_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.contenido
    ADD CONSTRAINT contenido_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.contenido DROP CONSTRAINT contenido_pkey;
       public            postgres    false    205            �
           2606    16647 (   contenido_usuario contenido_usuario_pkey 
   CONSTRAINT     |   ALTER TABLE ONLY public.contenido_usuario
    ADD CONSTRAINT contenido_usuario_pkey PRIMARY KEY (usuario_id, contenido_id);
 R   ALTER TABLE ONLY public.contenido_usuario DROP CONSTRAINT contenido_usuario_pkey;
       public            postgres    false    207    207            �
           2606    16642    usuario usuario_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (numero_doc);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    206            �
           2606    16617 %   contenido contenido_contenido_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.contenido
    ADD CONSTRAINT contenido_contenido_id_fkey FOREIGN KEY (categoria_id) REFERENCES public.categoria(id);
 O   ALTER TABLE ONLY public.contenido DROP CONSTRAINT contenido_contenido_id_fkey;
       public          postgres    false    203    205    2706            �
           2606    16653 5   contenido_usuario contenido_usuario_contenido_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.contenido_usuario
    ADD CONSTRAINT contenido_usuario_contenido_id_fkey FOREIGN KEY (contenido_id) REFERENCES public.contenido(id);
 _   ALTER TABLE ONLY public.contenido_usuario DROP CONSTRAINT contenido_usuario_contenido_id_fkey;
       public          postgres    false    2708    207    205            �
           2606    16648 3   contenido_usuario contenido_usuario_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.contenido_usuario
    ADD CONSTRAINT contenido_usuario_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(numero_doc);
 ]   ALTER TABLE ONLY public.contenido_usuario DROP CONSTRAINT contenido_usuario_usuario_id_fkey;
       public          postgres    false    207    206    2710               #   x�3��M,I�M,�LN,�2��I�K/�b���� ��j         �   x���M�0���^��?z�`bJ�Tf���7��^��g�G��,��6Q��w��i�����0n�y�A$t�����Mfv��X�K�A�E��{��s����,fh^,OX��`��-�#�ki]�*Y�%�DVp`����/���RK�se            x������ � �             x�34���L/M��,I�-�/J������ _{     