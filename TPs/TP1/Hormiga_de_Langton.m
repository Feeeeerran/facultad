function Hormiga_de_Langton
clear all 
clc


% L = input("Tamaño de la matriz cuadrada ");
L=151;
M=zeros(L);
% Posicionamos la hormiga en el centro de la matriz
px = (L+1)/2;
py = (L+1)/2;
% M(py,px)=1;

% Direccion aleatoria de la hormiga en las 4 direcciones posibles
dir = randi(4)
% Entonces se define
    %   1 = Arriba
    %   2 = Derecha
    %   3 = Abajo
    %   4 = Izquierda    
flag = 0;
it=0;

figure;
while flag==0
    it=it+1;
    
    % Si vale 1 --> blanco
    % Si vale 0 --> negro
    
    if dir == 1
        py=py-1;
        if M(py,px)==1
            M(py,px)=0;
            dir = 2;
        elseif M(py,px)==0
            M(py,px)=1;
            dir = 4;
        end
    end
    
    if dir == 2
        px=px+1;
        if M(py,px)==1
            M(py,px)=0;
            dir=3;
        elseif M(py,px)==0
            M(py,px)=1;
            dir=1;
        end
    end
    
    if dir == 3
        py=py+1;
        if M(py,px)==1
            M(py,px)=0;
            dir=4;
        elseif M(py,px)==0
            M(py,px)=1;
            dir=2;
        end
    end
    
    if dir == 4
        px=px-1;
        if M(py,px)==1
            M(py,px)=0;
            dir=1;
        elseif M(py,px)==0
            M(py,px)=1;
            dir=3;
        end
    end
    
    if px == L-1 | px == 1 | py == L-1 | py == 1
        flag = 1;
    end

    imagesc(M);
    colormap gray;
    drawnow;
end
% disp("Cantidad de iteraciones: ");disp(it)
% imagesc(M);
% colormap gray;

end



